import { useUserStore } from "@/stores/counter";
import type { User } from "@/types/types";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";

export function useLoginCheck() {
  const { cookies } = useCookies();

  const token = cookies.get("auction_auth_token");

  const store = useUserStore();

  const {
    loading,
    error,
    mutate: checkToken,
    onDone,
    onError,
  } = useMutation<{ checkToken: User }, { token: string }>(gql`
    mutation ($token: String!) {
      checkToken(token: $token) {
        name
        money
      }
    }
  `);

  onDone((result) => {
    console.log(result);
    if (!result.data) return;
    if (result.data.checkToken == null) {
      cookies.remove("auction_auth_token");
      store.logout();
    } else {
      store.login(result.data.checkToken);
    }
  });

  onError((err) => {
    cookies.remove("auction_auth_token");
    console.log(err);
  });

  if (token) {
    checkToken({ token });
  } else {
    store.logout();
  }

  return { error, loading };
}
