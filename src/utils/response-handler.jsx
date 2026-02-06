import { INTERNAL_SERVER_ERROR_MESSAGE, SOMETHING_WENT_WRONG } from "../store/constants";

async function responseHandler(res, setInfo) {

    let response = await res.json();

    if (res.status === 200 || res.status === 201) {
        setInfo({
            message: response.message,
            type: 'success'
        });
    }

    if (res.status === 400 || res.status === 404) {
        setInfo({
            message: response.message,
            type: 'warning'
        });
    }

    if (res.status === 401 || res.status === 403) {
        setInfo({
            message: response.message,
            type: 'error'
        });
    }

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