# Spotplay 

Spotplay es una nueva compañía de música online que tiene como objetivo proporcionar mejores relaciones con los artistas y fans. 

Su producto es _Spotplay_, una plataforma en la que las personas pueden generar  listas de reproducción para sus artistas favoritos y gustos musicales. 

## Estado actual 
El CEO de _Spotplay_ te contrató para desarrollar la versión inicial de su producto. 

Vale la pena mencionar que ella no tiene ningún conocimiento técnico. Sin embargo, tiene una visión clara sobre cómo debe comportarse el producto, por lo que proporcionó una lista de requisitos funcionales.

### Requisitos 
* Cada usuario tendrá un ID **único**, y se autenticará usando un **nombre no vacío** y una **contraseña**.

* Cada usuario podrá guardar una lista de canciones. Cada canción tendrá un **artista** y **título**, y cada lista estará definida por un id **único** y un nombre.

* El sistema tiene que permitir las siguientes acciones (usuarios lectores) 
    * Crear una nueva lista con un nombre dado (generar automáticamente el id **unique**) 
    * Obtener las listas de usuarios.
    * Obtener una lista individual para el usuario.
    * Agregar canciones a una lista determinada (basada en el id generado). 
    * Todos los puntos finales deben protegerse con Autenticación mediante token. 
* Debe asegurarse de que la contraseña sea lo suficientemente segura.
* Los usuarios editores, deben poder agregar nuevas canciones y artistas.
### extra..
* Contar con cuentas basico y premium para los usuarios consumidores.
* Agregar anuncios para las cuentas basicas. 

## ¿Qué buscamos? 
* **Una solución y arquitectura bien diseñada** Evite la duplicación, extraiga código reutilizable donde tiene sentido. Queremos ver que puede crear una base de código fácil de mantener. 

* **Almacenamiento** No necesitamos una implementación completa de la base de datos, está bien guardar sus datos en la memoria por ahora. _Sin embargo_ estamos buscando una arquitectura que nos permita añadir una base de datos lo más fácil posible.  

!ponemos el exito de nuestra aplicacion en tus manos.!