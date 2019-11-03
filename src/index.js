import axios from 'axios';

class App {
    constructor() {
        this.photosNasa = [];

        this.classesection = document.getElementById('secao');

        this.addPhotos();
    }

    async addPhotos() {

        let anoAtual = new Date().getFullYear();
        console.log(anoAtual)

        var dia = 1;
        var mes = 8;

        var datamax = 31

        while (dia <= datamax) {
            this.photosNasa = [];
            
            var diaform = dia <= 9 ? '0' + dia.toString() : dia.toString();
            var mesform = mes <= 9 ? '0' + mes.toString() : mes.toString();
            let dateFormt = `${anoAtual}-${mesform}-${diaform}`
           
            let link = 'https://api.nasa.gov/planetary/apod?api_key=7dfNpX7YU51fptt695iUnD33Ls5tk0lLtjXWATa0';
            const response = await axios.get(link + `&date=${dateFormt}`);
            const { url, date, title, media_type } = response.data;
            
            this.photosNasa.push({
                url,
                date,
                title,
                media_type
            });
            
            if (dia === datamax) {
                break;
            } else {
                this.renderPhotos(media_type);
                dia++;
            }
        }
    }
    renderPhotos(typeMedia) {
        
        this.photosNasa.forEach(nasaPhotos => {
            console.log(typeMedia)
            const element = typeMedia === 'image'? 'img':'iframe';

            const mediaItem = document.createElement(element);
            mediaItem.setAttribute('src', nasaPhotos.url);

            let texteItem = document.createElement('strong');
            texteItem.appendChild(document.createTextNode(nasaPhotos.title));

            let dataItem = document.createElement('h4');
            dataItem.appendChild(document.createTextNode(nasaPhotos.date));

            
            let divItem = document.createElement('div');

            divItem.appendChild(mediaItem);
            divItem.appendChild(texteItem);
            divItem.appendChild(dataItem);

            this.classesection.appendChild(divItem);
        });
    }
}

new App();