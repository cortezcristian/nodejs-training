var forms = require('forms'),
    fields = forms.fields,
    validators = forms.validators;

module.exports = forms.create({
    nombre: fields.string({
        required: true,
        errorAfterField: true
    }),
    apellido: fields.string({
        required: true,
        errorAfterField: true
    }),
    email: fields.email({
        required: true, 
        errorAfterField: true 
    }),
    password: fields.password({
        required: true,
        errorAfterField: true
    }),
    confirm:  fields.password({
        required: true,
        errorAfterField: true,
        validators: [validators.matchField('password')]
    })
});
