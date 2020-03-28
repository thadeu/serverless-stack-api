export const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      rating: 10,
      message: `HELLO Go Serverless v1.0! ${await message({
        time: 1,
        copy: "Your function executed successfully!"
      })}`
    })
  };
};

export const hola = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      rating: 10,
      message: `HOLA Go Serverless v1.0! ${await message({
        time: 1,
        copy: "Your function executed successfully!"
      })}`
    })
  };
};

const message = ({ time, ...rest }) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(`${rest.copy} (with a delay)`);
    }, time * 1000)
  );
