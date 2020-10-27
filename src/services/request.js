const baseRequest = async (url, path, options = {}) => {
    try {
        const response = await fetch(
            url + path,
            {
                ...options,
            }
        );
        return await response.json();

    } catch (error) {
        console.log(error);
    }
};

export const defaultPostConfig = {
    method: 'POST',
    headers: {
        'content-type': 'Application/json'
    }
};

export const get = async (url, path, options = {}) => {
    return await baseRequest(url, path, {
        method: 'GET',
        ...options
    });
};

export const post = async (url, path, payload, options = {}) => {
    return await baseRequest(url, path, {
        body: JSON.stringify(payload),
        ...defaultPostConfig,
        ...options
    });
};
