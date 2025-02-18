// const express = require('express');
// const router = express.Router();
// const FormToCreateUserService = require('../../services/createUser');

// router.post('/', async (req, res)=> {
//     const data = req.body;
//     const response = await FormToCreateUserService.createUser(data);

//     console.log(`responseeeeee`, response);

//     if (response.success) {
//         res.status(201).json({
//           message: 'Account created successfully.',
//           data: response.data,
//         });
//       } else {
//         res.status(400).json({
//           message: 'You already have an account.',
//           error: response.error,
//         });
//       }
// })

// module.exports = router;