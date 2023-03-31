const { createApp } = Vue

const app = createApp({
    data(){
        return {
            apiUrl: 'https://mindhub-xj03.onrender.com/api/amazing',
            eventos: [],
            texto: '',
            eventosAMostrar: [],
            categorias: [],
            categoriasSeleccionadas: [],
            eventosPasados:[],
            eventosFuturos:[],
            categoriasPasadas: [],
            categoriasFuturas: [],
            tabla1:[],
            tablaPasado: [],
            tablaFututo: [],
            tabla_pasado: [],
            tabla_futuro: []
            
            
        }
    },
    created(){
        this.obtenerEventos()
    },
    mounted(){

    },
    methods: {
        obtenerEventos() {
            fetch(this.apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.eventos = data.events
                    this.date = data.currentDate
                    this.eventosAMostrar = this.eventos
                    /* this.extraerCategorias(data) */
                    /* this.porcentajeAsistencia(this.eventos) */
                })
        },
        porcentajeAsistencia(eventos) {
            eventos.forEach(evento => {
                if (isNaN(evento.assistance)) {
        
                    evento["porcentaje"] = parseFloat(((evento.estimate / evento.capacity) * 100).toFixed(2))
                } else {
                    evento["porcentaje"] = parseFloat(((evento.assistance / evento.capacity) * 100).toFixed(2))
        
                }
            });
        },
        filtrarEventosPasados(eventos, fechaActual) {
            let eventosPasados = eventos.filter((event) => event.date < fechaActual)
            return eventosPasados
        },
        filtrarEventosFuturos(eventos, fechaActual) {
            let eventosFuturos = eventos.filter((event) => event.date > fechaActual)
            return eventosFuturos
        },
        extraerCategorias(array) {
            this.categorias=[];
            array.forEach(evento => {
                if (!this.categorias.includes(evento.category) && evento.category) {
                    this.categorias.push(evento.category)
                }
            })
            return this.categorias
        },
        tablaCategorias(arrayCategorias, eventos) {
            let tabla = []
            for (let i = 0; i < arrayCategorias.length; i++) {
                tabla.push([])
                for (const evento of eventos) {
                    if (arrayCategorias[i] == evento.category) {
                        tabla[i].push(evento)
                    }
                }
            }
            return tabla
        },
        minMaxTabla(eventos){
            this.tabla1 = {
                'mayorCapacidad': eventos.sort(function (a, b) { return b.capacity - a.capacity })[0],
                'mayorPorcentaje': eventos.sort(function (a, b) { return b.porcentaje - a.porcentaje })[0],
                'menorPorcentaje': eventos.sort(function (a, b) { return a.porcentaje - b.porcentaje })[0]
            }
        
        },
        imprimirTablas(array, tabla) {
            for (let i = 0; i < array.length; i++) {
        
                let revenue = 0
                let porcentajeTabla = 0
                let categoria
                for (const evento of array[i]) {
                    categoria = evento.category
                    revenue += evento.price * (isNaN(evento.assistance) ? evento.estimate : evento.assistance)
                    porcentajeTabla += evento.porcentaje
                }
                porcentajeTablaPromedio = parseFloat((porcentajeTabla / (array[i].length)).toFixed(2))
                tabla.push([categoria,revenue,porcentajeTablaPromedio])
            }
        },
    },
    computed: {
        tablas() {
            this.porcentajeAsistencia(this.eventos)
            this.eventosPasados = this.filtrarEventosPasados(this.eventos, this.date)
            this.eventosFuturos = this.filtrarEventosFuturos(this.eventos, this.date)
            this.minMaxTabla(this.eventosPasados)
            this.categoriasPasadas = this.extraerCategorias(this.eventosPasados)
            this.categoriasFuturas = this.extraerCategorias(this.eventosFuturos)
            this.tablaPasado = this.tablaCategorias(this.categoriasPasadas, this.eventosPasados)
            this.tablaFuturo = this.tablaCategorias(this.categoriasFuturas, this.eventosFuturos)
            this.imprimirTablas(this.tablaPasado, this.tabla_pasado)
            this.imprimirTablas(this.tablaFuturo, this.tabla_futuro)
        }

        }
}).mount('#app')