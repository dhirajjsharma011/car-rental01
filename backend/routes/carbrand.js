const express = require('express');
const router = express.Router();

const Brand = require('../model/brand');
const { data } = require('react-router-dom');
const brand = require('../model/brand');

router.post('/brand', async (req, res) => {
  try {
    const { brand } = req.body;

    if (!brand) {
      return res.status(400).json({
        message: "Brand name is required"
      });
    }

    const exist = await Brand.findOne({ brand });

    if (exist) {
      return res.status(400).json({
        message: "Brand already exists"
      });
    }

    const newBrand = await Brand.create({ brand });

    res.status(201).json({
      success: true,
      data: newBrand
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.get("/carbrand", async(req,res)=>{
  try{
     const brandss = await brand.find();

     res.status(200).json({
      total:brand.length,
      data:brandss,
     });
  } catch(err){
    res.status(500).json({
      message: "server error",
      error:err.message,
    });
  }
});

module.exports = router;