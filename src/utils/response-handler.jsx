import { INTERNAL_SERVER_ERROR_MESSAGE, SOMETHING_WENT_WRONG, UNAUTHORIZED_ACCESS } from "@/store/constants";
import { FRONTEND_URL } from "@/store/UrlStore";

async function responseHandler(res, setInfo) {

    let response = await res.json();

    if (UNAUTHORIZED_ACCESS.indexOf(response?.message) !== -1) {

        setTimeout(() => {
            window.location.href = FRONTEND_URL + '/verification';
        }, 2000);

        setInfo({
            message: response.message,
            type: 'warning'
        });
    }

    if (res.status === 200 || res.status === 201) {
        setInfo({
            message: response.message,
            type: 'success'
        });
    }

    // notifying as per bad request (warning)
    // notifying as per not found (warning)
    if (res.status === 400 || res.status === 404) {
        setInfo({
            message: response.message,
            type: 'warning'
        });
    }

    // notifying as per unauthorized (error)
    // notifying as per forbidden (error)
    if (res.status === 401 || res.status === 403) {
        setInfo({
            message: response.message,
            type: 'error'
        });
    }

    // notifying as per server error (info)
    if (res.status === 500) {
        setInfo({
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            type: 'info'
        });
    }

}


async function errorHandler(err, setInfo) {

    console.log(err);
    setInfo({
        message: SOMETHING_WENT_WRONG,
        type: 'info'
    })

}


export { errorHandler };
export { responseHandler };