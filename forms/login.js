var forms = require('forms'),
    fields = forms.fields,
    validators = forms.validators;

module.exports = forms.create({
    email: fields.email(),
    password: fields.password({required: true})
});
