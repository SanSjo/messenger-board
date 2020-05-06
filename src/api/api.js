module.exports = SetupEndpoint({
  name: 'messages',
  urls: [
    {
      Response: {
        result: [
          {
            id: 'number',
            message: 'string',
            author: 'number',
          },
        ],
      },
    },
  ],
},
  {
    Request:
{
message: string,
author: number,
}


  }
});