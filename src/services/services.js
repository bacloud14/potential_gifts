/**
 * SERVICES.JS
 * AUTHOR: RJ HILL
 */

'use strict';
const router = require('express').Router();

const mysql = require('mysql2/promise');

/**
 * @api {get} /assets/ Request all Assets
 * @apiName assets
 * @apiGroup services
 *
 * @apiSuccess {Array}    rows                The rows of data from the table.
 * @apiSuccess {Object}   row                 Each row contains the following properties:
 * @apiSuccess {Number}   id                  The ID of the row.
 * @apiSuccess {String}   name                The name of the row.
 * @apiSuccess {String}   description         The description of the row.
 * @apiSuccess {String}   type                The type of the row.
 * @apiSuccess {Boolean}  ephemeral           The ephemeral of the row.
 * @apiSuccess {Date}     expiration          The expiration of the row.
 * @apiSuccess {Boolean}  atomic              The atomic of the row.
 * @apiSuccess {Boolean}  valuable_exchange   The valuable_exchange of the row.
 * @apiSuccess {String}   unicode             The unicode of the row.
 * @apiSuccess {String}   media               The media of the row.
 */
router.get('/assets', async (req, res, next) => {
  // we can use pools here but this is just a first pass
  const connection = await mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      database: process.env.DB_DATA,
      password: process.env.DB_PASS
    }
  );

  const [rows] = await connection.execute(
    'SELECT * FROM `generic_asset`'
  );

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ rows });
  return next();
});

/**
 * @api {get} /assets/atomic Request all Assets which are atomic
 * @apiName assets:atomic
 * @apiGroup services
 *
 * @apiSuccess {Array}    rows                The rows of data from the table.
 * @apiSuccess {Object}   row                 Each row contains the following properties:
 * @apiSuccess {Number}   id                  The ID of the row.
 * @apiSuccess {String}   name                The name of the row.
 * @apiSuccess {String}   description         The description of the row.
 * @apiSuccess {String}   type                The type of the row.
 * @apiSuccess {Boolean}  ephemeral           The ephemeral of the row.
 * @apiSuccess {Date}     expiration          The expiration of the row.
 * @apiSuccess {Boolean}  atomic              The atomic of the row.
 * @apiSuccess {Boolean}  valuable_exchange   The valuable_exchange of the row.
 * @apiSuccess {String}   unicode             The unicode of the row.
 * @apiSuccess {String}   media               The media of the row.
 */
router.get('/assets/atomic', async (req, res, next) => {
  // we can use pools here but this is just a first pass
  const connection = await mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      database: process.env.DB_DATA,
      password: process.env.DB_PASS
    }
  );

  const [rows] = await connection.execute(
    'SELECT * FROM `generic_asset` WHERE `atomic` = ?', [true]
  );

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ rows });
  return next();
});

/**
 * @api {get} /assets/type/:type Request all Assets which are of the given type
 * @apiName assets:type
 * @apiGroup services
 * 
 * @apiParam {String} type The type of asset.
 *
 * @apiSuccess {Array}    rows                The rows of data from the table.
 * @apiSuccess {Object}   row                 Each row contains the following properties:
 * @apiSuccess {Number}   id                  The ID of the row.
 * @apiSuccess {String}   name                The name of the row.
 * @apiSuccess {String}   description         The description of the row.
 * @apiSuccess {String}   type                The type of the row.
 * @apiSuccess {Boolean}  ephemeral           The ephemeral of the row.
 * @apiSuccess {Date}     expiration          The expiration of the row.
 * @apiSuccess {Boolean}  atomic              The atomic of the row.
 * @apiSuccess {Boolean}  valuable_exchange   The valuable_exchange of the row.
 * @apiSuccess {String}   unicode             The unicode of the row.
 * @apiSuccess {String}   media               The media of the row.
 */
router.get('/assets/type/:type', async (req, res, next) => {
  // destructure the params
  let { type } = req.params

  // we can use pools here but this is just a first pass
  const connection = await mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      database: process.env.DB_DATA,
      password: process.env.DB_PASS
    }
  );

  const [rows] = await connection.execute(
    'SELECT * FROM `generic_asset` WHERE `type` = ?', [type]
  );

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ rows });
  return next();
});

/**
 * SERVICES.JS EXPORTS
 */
module.exports = router;