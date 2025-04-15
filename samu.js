



class Complejidad {
    modificadorDeComplejidad(tarea) {return 0 };
        subirDificultad() {return this;}
        bajarDificultad() {return this;}

}

class ComplejidadMinima extends Complejidad {
    subirDificulad() { return new ComplejidadMedia()};
}

class ComplejidadMedia extends Complejidad {
    modificadorDeComplejidad(tarea) {
        return tarea.getCostoBase() * 0.5;
    }
    subirDificulad() { return new ComplejidadMaxima()};
    bajarDificultad() { return new ComplejidadMinima()};
    
}


class ComplejidadMaxima extends Complejidad {
    modificadorDeComplejidad(tarea) {
        const base = tarea.getCostoBase();
        const duracion = tarea.getDuracion();
        let extra = base * 0.7;
        if (duracion > 10) {
            extra += (duracion - 10) * 1000;
        }
        return extra;
    }
    bajarDificultad() {return new ComplejidadMedia()}
}



class Tarea {
    constructor(codigo, duracion, valor = 100, complejidad = new ComplejidadMinima()) {
        this.codigo = codigo;
        this.duracion = duracion;
        this.valor = valor;
        this.complejidad = complejidad;
    }
    getCodigo() {
        return this.codigo;
    }
    getDuracion() {
        return this.duracion;
    }
    getCostoBase() {
        return this.duracion * this.valor;
    }
    getCosto() {
        return this.getCostoBase() + this.complejidad.modificadorDeComplejidad(this);
    }
    subirDificulad() {
        this.complejidad = this.complejidad.subirDificultad();
    }
    bajarDificultad() {
        this.complejidad = this.complejidad.bajarDificultad();
    }
    mostrarTarea() {
        console.log(`Tarea Simple: Codigo: ${this.codigo} - Duracion: ${this.duracion} - Costo: ${this.getCosto()}. `)
    }

}





class TareaCompuesta {
    constructor(codigo, duracion, tareas = [], valor = 100, complejidad = new ComplejidadMinima()) {
        this.codigo = codigo;
        this.duracion = duracion;
        this.tareas = tareas;
        this.valor = valor;
        this.complejidad = complejidad;

    }

    agregarTarea(tarea) {

        return this.tareas.push(tarea);
    }
    getCodigo(){
        return this.codigo;
    }
    getDuracion() {
        const duracionSubtareas = this.tareas.reduce((acu, item) => acu + item.getDuracion(), 0);
        return this.duracion + duracionSubtareas
    }
    getCostoBase() {
        const propio = this.duracion * this.valor;
        const costoSubtareas = this.tareas.reduce((acu,  item) => acu + item.getCosto(), 0);        
        return propio + costoSubtareas;  
    }
    getCosto() {
        let subTotal = this.getCostoBase();
        subTotal += this.complejidad.modificadorDeComplejidad(this);
        if (this.tareas.length > 3) {
            subTotal *= 1.04;
        }
        return subTotal;

    }
    mostrarTarea() {
        console.log(`Tarea compuesta: Codigo ${this.getCodigo()} - Duracion: ${this.getDuracion()} - Costo: ${this.getCosto()}`);
        this.tareas.forEach(item => item.mostrarTarea());
    }

}




class Proyecto {
    constructor() {
    
        this.tareas = [];
    
    }
    
    agregarTarea(t) {
        return this.tareas.push(t);
    }
    getDuracion() {
        return this.tareas.reduce((acu, item) => acu + item.getDuracion(), 0);
    }
    mostrarTodasLasTareas() {
        return this.tareas.forEach((item) => item.mostrarTarea());
    }
}


const t11 = new Tarea("1.1", 6);
const t121 = new Tarea("1.2.1", 4);
const t1221 = new Tarea("1.2.2.1", 3);
const t1222 = new Tarea("1.2.2.2", 6);
const t131 = new Tarea("1.3.1", 2);
const t132 = new Tarea("1.3.2", 1);

const t122 = new TareaCompuesta("1.2.2", 1, [t1221, t1222]);
const t13 = new TareaCompuesta("1.3.1", 3, [t131, t132]);
const t12 = new TareaCompuesta("1.2",4, [t121, t122]);

//tarea principal
const tareaPrincipal = new TareaCompuesta("1", 2, [t11, t12, t13]);


const p = new Proyecto();
p.agregarTarea(tareaPrincipal);
p.mostrarTodasLasTareas();
console.log(`Duracion Total: ${p.getDuracion()}.`);






