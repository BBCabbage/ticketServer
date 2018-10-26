
function onerror(err) {
    console.log(err.message);
}

module.exports = async (uri, onSuccess, onError = onerror) => {
    var mongoose = require('mongoose');
    try {
        await mongoose.connect(uri, { useNewUrlParser: true });
        console.log('Connected to db successfully.')
        onSuccess();
    } catch (err) {
        onError(err);
    }
}
