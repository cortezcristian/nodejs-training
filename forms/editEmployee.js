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
    })
});
