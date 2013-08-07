var forms = require('forms'),
    fields = forms.fields,
    validators = forms.validators;

module.exports = forms.create({
    nombre: fields.string({
        required: true,
        errorAfterField: true
    }),
    username: fields.string({
        required: true,
        errorAfterField: true
    }),
    password: fields.password({required: true}),
    confirm:  fields.password({
        required: true,
        validators: [validators.matchField('password')]
    }),
    email: fields.email({
        required: true, 
        errorAfterField: true 
    })
});
