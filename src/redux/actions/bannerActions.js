import { fetchApi } from '../../services/api';

export const BANNER = 'BANNER';

const fetchbanners = (wishlists) => ({
  type: BANNER,
  payload: wishlists,
});
export const fetchbanner = () => async (dispatch) => {

  return fetchApi('/banner/loadBanner', null, {}, false, 'post')
    .then((response) => {

      var arr = []
      for (var i = 0; i < response.data.content.length; i++) {
        arr.push({
          id: i + 1,
          "title": "",
          "subtitle": "",
          image: "https://api.utsavplastotech.co.in" + response.data.content[i].imageUrl,
          "url": "/shop-grid-standard"
        })
      }
      dispatch(fetchbanners(arr))

    })
    .catch((err) => console.log('error ->', err));

};