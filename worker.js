export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: cors()
      });
    }

    try {

      const body = await request.json();

      const response = await fetch(
        "https://api.replicate.com/v1/predictions",
        {
          method: "POST",
          headers: {
            "Authorization": "Token " + env.REPLICATE_TOKEN,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const data = await response.text();

      return new Response(data, {
        headers: {
          ...cors(),
          "Content-Type":"application/json"
        }
      });

    } catch (e) {

      return new Response(
        JSON.stringify({
          error:e.message
        }),
        {
          status:500,
          headers:{
            ...cors(),
            "Content-Type":"application/json"
          }
        }
      );
    }
  }
}

function cors(){
  return {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"POST, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type"
  };
}
