import pool from './pool';


pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create Enseignant Table
 */

 const createEnseignantTable = () => {
     const enseignantCreateQuery = `CREATE TABLE IF NOT EXISTS enseignant
     (  id SERIAL PRIMARY KEY,
        nom VARCHAR(100),
        prenom VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        is_admin BOOL DEFAULT(false),
        created_on DATE NOT NULL)`;

    pool.query(enseignantCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
 };
/**
 * Drop Enseignant Table
 */

 const dropEnseignantTable = () => {
    const enseignantDropQuery = 'DROP TABLE IF EXISTS enseignant';
    pool.query(enseignantDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
 };


/**
 * Create Matiere Table
 */


 const createMaterielTable = () => {
     const materielCreateQuery = `CREATE TABLE IF  NOT EXISTS materiel
     (code VARCHAR(100) PRIMARY KEY,
     description TEXT NOT NULL)`;
     pool.query(materielCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
 };


/**
 * Drop Matriel Table
 */


 
const dropMaterielTable = () => {
    const materielDropQuery = 'DROP TABLE IF EXISTS materiel';
    pool.query(materielDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
 };



/**
 * Create Pret Table
 */


 const createPretTable = () => {
     const pretCreateQuery = `CREATE TABLE IF NOT EXISTS pret 
     (  
        id INTEGER REFERENCES enseignant(id) ON DELETE CASCADE,
        code VARCHAR(100) REFERENCES materiel(code) ON DELETE CASCADE,
        date_pret DATE NOT NULL,
        date_retour DATE,
        date_retour_effectif DATE,
        quantite INTEGER NOT NULL CHECK (quantite > 0),
        PRIMARY KEY(id, code))`;

        pool.query(pretCreateQuery)
            .then((res) => {
                console.log(res);
                pool.end();
            })
            .catch((err) => {
                console.log(err);
                pool.end();
            });
 };


 /**
 * Drop Pret Table
 */


 
const dropPretTable = () => {
    const matierePretQuery = 'DROP TABLE IF EXISTS pret';
    pool.query(matierePretQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
 };
/************************************************************************************************************************ */

 /**
  * Create All Tables
  */

  const createAllTables = () => {
      createEnseignantTable();
      createMaterielTable();
      createPretTable();
  };


  /**
   * Drop All Tables 
   */

   const dropAllTables = () => {
       dropEnseignantTable();
       dropMaterielTable();
       dropPretTable();
   };
/************************************************************************************************** */
   pool.on('remove', () => {
       console.log('client removed');
       process.exit(0);
   });

   export {
       createAllTables,
       dropAllTables,
   }

   require('make-runnable');