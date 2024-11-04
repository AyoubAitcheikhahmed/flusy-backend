import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePDF = async (order) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument();
      
      // Define the output path for the PDF file
      const outputPath = path.join(process.cwd(), 'order.pdf');
      const writeStream = fs.createWriteStream(outputPath);
      
      doc.pipe(writeStream);

      // Customize the PDF content for a specific order
      doc.fontSize(25).text('Order Details', { align: 'center' });
      doc.moveDown();

      doc
        .fontSize(14)
        .text(`ID: ${order.id}`)
        .text(`Name: ${order.firstName} ${order.lastName}`)
        .text(`Email: ${order.email}`)
        .text(`Phone: ${order.phoneNumber1}`)
        .text(`Street: ${order.street}, ${order.numberBus}`)
        .text(`City: ${order.city}`)
        .text(`Postcode: ${order.postcode}`)
        .text(`Created At: ${order.createdAt}`);

      // Finalize the PDF and end the stream
      doc.end();

      // Wait for the write stream to finish
      writeStream.on('finish', () => {
        resolve('PDF file generated successfully!');
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};
