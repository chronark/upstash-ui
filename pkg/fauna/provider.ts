import { Client } from "faunadb";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";


export function newFaunaClient(secret:string){
  return new Client({
    domain: "db.us.fauna.com",
    secret,
  });
}

export const useFauna = () => {
  const { getAccessTokenSilently } = useAuth0();

  const { data, ...meta } = useQuery<Client, Error>("USE_FAUNA", async () => {
    return new Client({
      domain: "db.us.fauna.com",
      secret: await getAccessTokenSilently(),
    });
  });
  return { client: data!, ...meta };
};
