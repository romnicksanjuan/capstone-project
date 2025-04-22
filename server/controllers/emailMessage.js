const message = (status) => {
    if (status === 'completed') {
        return 'Your request has been successfully completed'
    } else if (status === 'in-progress') {
        return 'Just a quick update — your request is currently being processed'
    } else if (status === 'ready-for-release') {
        return 'Your requested item is now ready for release.'
    } else if (status === 'not-available') {
        return 'We’re sorry to inform you that the item you requested is currently not available.'
    } else {
        return ''
    }
}

module.exports = {message}