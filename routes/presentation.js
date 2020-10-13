var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    const data = {
        data: {
            text: `Hej jag heter simon och kommer från Uppsala. Jag är 22 år och gick ut gymnasiet från IT-G gymnasiets tekniska utbildning 2017. Jag har alltid varit väldigt intreserad av datorer och internet. Därför har jag valt att jag ska bli webutvecklare. dettta värkade då som ett bra ställe att börja min karriärs plan på.`
        }
    };

    res.json(data);
});


module.exports = router;
