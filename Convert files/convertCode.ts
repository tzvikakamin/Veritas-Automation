import Tesseract from 'tesseract.js';

async function extractTextFromImage(imagePath: string): Promise<string> {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      'eng', // קוד השפה (כאן אנגלית, ניתן לשנות לפי הצורך)
      {
        logger: info => console.log(info) // אפשר להוסיף פונקציית לוג
      }
    );
    return result.data.text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    return '';
  }
} 


// דוגמה לשימוש
(async () => {
  const imagePath = 'Convert files/screenShots/example.png'; // הנתיב לתמונה שצולמה
  const text = await extractTextFromImage(imagePath);
  console.log('Extracted text:', text);
})();

export default extractTextFromImage
