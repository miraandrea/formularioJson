const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const json_register = fs.readFileSync('src/form.json', 'utf-8')
let register = JSON.parse(json_register);
const alert = ""

router.get('/', (req, res ) => {
    res.render('index.ejs', {
        register
    });
});

router.get('/new-entry',  (req, res ) => {
    res.render('new-entry.ejs');
})

router.post('/new-entry',  (req, res ) => {
    const {name, document, phone} = req.body;
    let newRegister = {
        id: uuidv4(),
        name, 
        document, 
        phone
    }
    
    register.push(newRegister);
    
    const json_register = JSON.stringify(register);
    fs.writeFileSync('src/form.json', json_register, 'utf-8' );
    
    res.redirect('/');
})

router.get('/delete/:id', (req, res) => {
    register = register.filter(people => people.id != req.params.id);

    const json_register = JSON.stringify(register);
    fs.writeFileSync('src/form.json', json_register, 'utf-8' );

    res.redirect('/');
})

module.exports = router;