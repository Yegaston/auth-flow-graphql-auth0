# clon-de-airbnb

*Eliminar esto al final xd*

Un clon de Airnbn.

En React, y React Native.



Mi proyecto mas ambicioso hasta ahora.



### Backend

Eleji SQL para la base de datos. Por que?, por que de mongodb algo se pero de sql no se nada y me conviene aprender. Postgres como gestor

Voy a usar Graphql, por que no. ya que vamos a aprender 500mil cosas.

Como lenguaje, nodejs con typescript.

Obviamente voy a necesitar un backend para hacer user auth.

Tengo muchisimas posibilidades para elegir que usar, todas requieren que aprenda algo basicamente. (Register - con email de confirmacion(Seguramente use algun servicio de terceros.) - Login, - Logout.)

Esto conlleva el uso de cookies. Tengo que investigar este tema mas.

Passport?? o que mierda uso como middleware para esto.

Seguramente use tokens para validar acciones. OAuth, o algo por estilo voy a tener que implementar. Otro tema a investigar.

Testing con jest. Otro tema mas a estudiar. Implementarlo en GitLab(no tengo idea con q) o en GitHub con Travis. (Travis, otra cosa que aprender.)



##### Opcional

** Aprender Email HTML para el email de confirmacion.

** Considerar limitar cantidad de peticiones.

** Considerar blockear cuentas con actividad sospechosa.



#### Datos en blanco

Estuve pensando sobre que usar para la base de datos, y me tope con el Object Relational Mapping para trabajar incompatibilidades entre datos.

[TypeORM](https://typeorm.io/#/) es la utilidad que voy a usar para facilitar este aspecto. Por lo que estuve investigando, es lo suficientemente potente para solucionarme cualquier inconveniente, viene con implementacion con postgress (Gracias a dios por que ya estaba pensando irme a MySQL solamente por soporte de dependencias.), y soporta mongodb, por si algun dia tengo que usarlo, sumo conocimiento.



A tambien tiene un CLI



Tras media hora de estar investigando, con que mierda ago el servidor, me encontre una serie de videos de youtube (SIII) que sigue una ruta muy parecida a la que quiero llevar a cabo.

El mayor problema que me encontre fue con que creo el servidor, graphql presentaba muchas deficultadas, Econtre oro, encontre [YOGA](https://github.com/prisma/graphql-yoga). Este es un conjunto de herramientas para trabajar con graphql y express.

El ejemplo de hello world consta de 3 partes

uno typeDef con una query, hello

un resolver con una query donde a hello le asigna el name de hello y le concadena hello.



uuid para generar los id (npm i uuid)


yup para validar datos.



-> Con este servidor se puede lograr con frontend como este, sin mucha complicacio.
### Frontend



La idea es lograr estos objetivos.

- Login / Register en web.
- Deploy en heroku. Back y Front.
- El registro en la app.
- Implementar Travis CI para Github.
- Manejar temas de seguridad. (Contraseña olvidada, validaciones de formularios.)
- Listar
- Chat
- Requirimientos.







Notas: 

Uso de Typescript

Uso de [Ant Design](ant.design)

*Eliminar esto al final xd*