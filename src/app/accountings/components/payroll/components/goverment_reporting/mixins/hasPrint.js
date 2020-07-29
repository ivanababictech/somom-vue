import jsPDF from "jspdf"
import html2canvas from 'html2canvas';

export default{
    props: {
        print: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        print () {
            this.toPdf()
        }
    },
    methods: {
        async toPdf() {
            let pdf = new jsPDF();
            let canvas = await this.canvasPage()
            this.printPage(canvas, pdf)
            pdf.save(this.$options.name + ".pdf");
        },
        canvasPage(i) {
            let page = document.getElementById('toPdf')
            let canvas = html2canvas(page)
            return canvas
        },
        printPage(canvas, pdf, addPage = false) {
            if (addPage) pdf.addPage()
            document.body.appendChild(canvas)
            canvas.getContext('2d');
            let imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
            document.body.removeChild(canvas)
        }
    }
}