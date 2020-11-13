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


 const createMatiereTable = () => {
     const matiereCreateQuery = `CREATE TABLE IF  NOT EXISTS matiere
     (code VARCHAR(100) PRIMARY KEY,
     description TEXT NOT NULL)`;
     pool.query(matiereCreateQuery)
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
 * Drop Matiere Table
 */


 
const dropMatiereTable = () => {
    const matiereDropQuery = 'DROP TABLE IF EXISTS matiere';
    pool.query(matiereDropQuery)
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
     (  id SERIAL,
        enseignant_id INTEGER REFERENCES enseignant(id) ON DELETE CASCADE,
        materiel_code VARCHAR(100) REFERENCES materiel(code) ON DELETE CASCADE,
        date_pret DATE NOT NULL,
        date_retour DATE,
        date_retour_effectif DATE,
        quantite INTEGER NOT NULL,
        PRIMARY KEY(id, enseignant_id, materiel_code))`;

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
      createMatiereTable();
      createPretTable();
  };


  /**
   * Drop All Tables 
   */

   const dropAllTables = () => {
       dropEnseignantTable();
       dropMatiereTable();
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