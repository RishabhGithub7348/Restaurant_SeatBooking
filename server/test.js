var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://rest.spryngsms.com/v1/balance',
  headers: { 
    'Accept': 'application/json', 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNGQ1MGVlOTYwMTk2ZWY4ODZjNTBlZmFkOWMyM2IyOWViMjRmNTJiZTFhMTBhMzk1YmMyZjVhNjQ5NmY2NmQyYzAwY2JiNjhjMzc4ZmIzMzIiLCJpYXQiOiIxNjg1OTA4NjEzLjQ5OTM3NyIsIm5iZiI6IjE2ODU5MDg2MTMuNDk5Mzc5IiwiZXhwIjoiNDg0MTU4NTgxMy40OTU0NDMiLCJzdWIiOiIxMDUwOTkiLCJzY29wZXMiOltdfQ.z0QzPaW23zkedt3GKa0evu_P2PEdhKBM0MxS_ld-97tNCqqmMtak082HRrJ-_drLqWupELs6TaHX5N1i6dpzNUZsw6Eey2nv-3MeP6jM4oE544LG-p8mRTHaepvDRGtMzTb7RBlXOku4YNLPrkRPN-xG2QEotOAbjGkaQHSSJLWSwE6QWcJpI0ICOK7UDP4MHwUhxtoV5pBRZ0QU-hbQGzCcsf88hl2_hlOxaoOqqRQAxLf7_pf_luAx-HqYlYmj-9aMmJ9n0xCrijiGYn3LDLUuy1rDjiEDOk8jxRzRfoJOmRi5P31bwBNgwEiHMKYE1r-0pOkR0XFnVitWRyRTnry0kDJCBtTnDyCqa9AA2a4noPEmrjLcUFA0TUH3SQrR6RjPkWulatZ2h1JUUFygsukQ4iyxQ-htlGgh-98cixdusJ2zgg2UhhYqsSiJjNj_2ZUNVMmBAZ05xS3JGAtP74BB_VFMXX-qlWD_HoKzjDrZawsF37_ArGPNTO0qDoCN0x2mFqHzdGUK6CiA2tBA2L40eRxVRpVxGmZVT0p9-Gcx1zbxHXxEffJlsAz-S4v3v8xCbZ7Mw7_RHrrykZrlzux-m-TkvFMYshjt31zFoWPbkrUhHWfsIhex-gfJY3YdB8cLbTv1HQ0zBkuzgXuxWXmHA5-e8wp3vXO7rcDkccY'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});