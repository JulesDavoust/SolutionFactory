const { response } = require('express')
const stripe = require('stripe')('sk_test_51NPmuzIHpdUumC00aGhX45nQ7ioPZE7FvLIBPLIYyyg97l0P9fqvw3amTDicMVyeeheDY0B2N31L4uP52HBdDKBq00qtk75VGJ');
const db = require('../models/index.cjs')

const paiement =  async (req, res) => {
    console.log("in payement")
    try {
        const {token, product, amount } = req.body;
        console.log(product.title, amount)
        const charge = await stripe.charges.create({
            amount: amount, // Stripe attend le montant en centimes
            currency: 'eur', // Remplacez par la devise de votre choix
            description: `Paiement pour la location du livre ${product.title}`, // Remplacez par une description appropriée
            source: token, // Token créé par Stripe Elements
        });
  
      res.json({ success: true, charge });
    } catch (err) {
        console.log(err); // ajoutez cette ligne
        res.status(500).json({ success: false, message: err.message });
    }
  };

module.exports={
    paiement
}