import fs from 'fs'
import pdf from 'html-pdf'
import { Response } from 'express'

export const generatePDF = (res: Response) => {

    const html = fs.readFileSync('index.html').toString()



    pdf.create(html, {
        type: 'pdf',
        format: 'A4',
        orientation: 'portrait'
    }).toBuffer((err, buffer) => {
        if (err) return res.status(500).json(err)

        res.end(buffer)
    })
}