import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

import { DescribeModelPackageGroupInput, DescribeModelPackageGroupOutput } from "../models/models_1";
import {
  deserializeAws_json1_1DescribeModelPackageGroupCommand,
  serializeAws_json1_1DescribeModelPackageGroupCommand,
} from "../protocols/Aws_json1_1";
import { SageMakerClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SageMakerClient";

export interface DescribeModelPackageGroupCommandInput extends DescribeModelPackageGroupInput {}
export interface DescribeModelPackageGroupCommandOutput extends DescribeModelPackageGroupOutput, __MetadataBearer {}

/**
 * <p>Gets a description for the specified model group.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SageMakerClient, DescribeModelPackageGroupCommand } from "@aws-sdk/client-sagemaker"; // ES Modules import
 * // const { SageMakerClient, DescribeModelPackageGroupCommand } = require("@aws-sdk/client-sagemaker"); // CommonJS import
 * const client = new SageMakerClient(config);
 * const command = new DescribeModelPackageGroupCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DescribeModelPackageGroupCommandInput} for command's `input` shape.
 * @see {@link DescribeModelPackageGroupCommandOutput} for command's `response` shape.
 * @see {@link SageMakerClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class DescribeModelPackageGroupCommand extends $Command<
  DescribeModelPackageGroupCommandInput,
  DescribeModelPackageGroupCommandOutput,
  SageMakerClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeModelPackageGroupCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: SageMakerClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DescribeModelPackageGroupCommandInput, DescribeModelPackageGroupCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "SageMakerClient";
    const commandName = "DescribeModelPackageGroupCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DescribeModelPackageGroupInput.filterSensitiveLog,
      outputFilterSensitiveLog: DescribeModelPackageGroupOutput.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DescribeModelPackageGroupCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DescribeModelPackageGroupCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DescribeModelPackageGroupCommandOutput> {
    return deserializeAws_json1_1DescribeModelPackageGroupCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
