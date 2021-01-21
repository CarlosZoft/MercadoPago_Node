const express = require('express');
const app = express();
const MercadoPago = require("mercadopago");

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-5818874060504009-012117-34dfce4510e7530dc7184bcea7777ee5-611498066"
})
app.get("/", (req,res)=>{
    res.send("Home")
})

app.get("/pagar", async (req,res)=>{
    var id = "" + Date.now();
    var email = "carlosk2gunn@gmail.com";
    var data = {
        items : [
            item = {
                id: id,
                title: "Caneca",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(20)
            }
        ],
        payer:{
            email: email,
        },
        external_reference: id    
    }
    try{
        var pagamento = await MercadoPago.preferences.create(data);
        res.status = 200;
        return res.redirect(pagamento.body.init_point)
    }
    catch(err){
        console.error(err);
        res.status = 401;
    }

})
app.post("/notification", (req,res)=>{
    var id = req.query.id;

    setTimeout(() =>{
        var filter = {
            "order.id": id
        }
    },20000)
    MercadoPago.payment.search({
        qs: filter
    }).then(data => {
        var pagamento = data.body.result[0];
        if(pagamento != undefined){
            console.log(pagamento.external_reference);
            console.log(pagamento.status);
        }
        else console.log("pagamento não existe");
    }).catch(err => console.log(err));
    res.send("OK")
})
app.listen(3030,(req,res) =>{
    console.log("app running");
})
