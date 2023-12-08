{
  "version": "2018-05-29",
  "operation": "PutItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($ctx.args.input.id),
    "timestamp": $util.dynamodb.toDynamoDBJson($ctx.args.input.timestamp)
  },
  "attributeValues": $util.dynamodb.toMapValuesJson($ctx.args.input),
  "condition": {
    "expression": "attribute_not_exists(#id) AND attribute_not_exists(#timestamp)",
    "expressionNames": {
      "#id": "id",
      "#timestamp": "timestamp",
    }
  }
}
