{
  "version": "2018-05-29",
  "operation": "PutItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($ctx.args.input.id),
    "datetimeuser": $util.dynamodb.toDynamoDBJson($ctx.args.input.datetimeuser)
  },
  "attributeValues": $util.dynamodb.toMapValuesJson($ctx.args.input),
  "condition": {
    "expression": "attribute_not_exists(#id) AND attribute_not_exists(#datetimeuser)",
    "expressionNames": {
      "#id": "id",
      "#timestamp": "timestamp",
    }
  }
}
