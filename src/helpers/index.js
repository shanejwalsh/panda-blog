//TODO make this work
export const parseDate = (date) => {
    if (!date) {
        return;
    }

    const dateToParse = new Date(date);

    const day = ('0' + dateToParse.getDate()).slice(-2);
    const month = ('0' + (dateToParse.getMonth() + 1)).slice(-2);
    const year = (dateToParse.getFullYear().toString());

    return `${day}-${month}-${year}`;
};


export const daysBetweenDates = date => {
    if (!date) {
        return;
    }

    const start = new Date(date).getTime();
    const end = new Date().getTime();

    const timeBetween = ((start - end) / (1000 * 3600 * 24));

    if (timeBetween === 0) {
        return 'Today';
    }

    if (timeBetween === 1 ) {
        return 'Yesterday';
    }

    return `${timeBetween} days ago`;

};

export const sortOldestToNewest = posts => posts.sort((a, b) => new Date(a.publish_date) > new Date(b.publish_date) ? 1 : -1);

export const sortNewestToOldest = posts => posts.sort((a, b) => new Date(a.publish_date) > new Date(b.publish_date) ? -1 : 1);

export const  debounce = (func, wait, immediate) => {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

