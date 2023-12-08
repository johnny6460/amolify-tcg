{
  "version": "2018-05-29",
  "operation": "Query",
  "query": {
    "expression": "#id = :id",
    "expressionNames": {
      "#id": "id"
    },
    "expressionValues": {
      ":id": $util.dynamodb.toDynamoDBJson($context.arguments.id)
    }
  },
  "limit": $util.defaultIfNull($context.arguments.first, 30),
  "nextToken": $util.toJson($util.defaultIfNullOrEmpty($context.arguments.after, null)),
  "scanIndexForward": false,
  "consistentRead": false,
  "select": "ALL_ATTRIBUTES"
}
