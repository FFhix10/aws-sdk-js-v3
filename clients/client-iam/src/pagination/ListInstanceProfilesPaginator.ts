import { Paginator } from "@aws-sdk/types";

import {
  ListInstanceProfilesCommand,
  ListInstanceProfilesCommandInput,
  ListInstanceProfilesCommandOutput,
} from "../commands/ListInstanceProfilesCommand";
import { IAM } from "../IAM";
import { IAMClient } from "../IAMClient";
import { IAMPaginationConfiguration } from "./Interfaces";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: IAMClient,
  input: ListInstanceProfilesCommandInput,
  ...args: any
): Promise<ListInstanceProfilesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListInstanceProfilesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: IAM,
  input: ListInstanceProfilesCommandInput,
  ...args: any
): Promise<ListInstanceProfilesCommandOutput> => {
  // @ts-ignore
  return await client.listInstanceProfiles(input, ...args);
};
export async function* paginateListInstanceProfiles(
  config: IAMPaginationConfiguration,
  input: ListInstanceProfilesCommandInput,
  ...additionalArguments: any
): Paginator<ListInstanceProfilesCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.Marker
  let token: typeof input.Marker | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListInstanceProfilesCommandOutput;
  while (hasNext) {
    input.Marker = token;
    input["MaxItems"] = config.pageSize;
    if (config.client instanceof IAM) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof IAMClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected IAM | IAMClient");
    }
    yield page;
    token = page.Marker;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
