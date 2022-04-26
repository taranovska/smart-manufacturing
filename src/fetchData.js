import axios from "axios";

import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./actions";

export function fetchData() {
  return (dispatch) => {
    // dispatch(fetchDataRequest());
    // console.log("post");
    // axios
    //   .get("https://my.api.mockaroo.com/smart_manufacturing.json?key=a252b490")
    //   .then(({ data }) => {
    //     dispatch(fetchDataSuccess(data));
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     dispatch(fetchDataError(error));
    //     console.log(error);
    //   });
  };
}
