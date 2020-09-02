import mongoose from 'mongoose';

//Conectando ao MongoDB pelo Mongoose
(async () => {
  try{
    await mongoose.connect("mongodb+srv://admin:root@cluster0.cxqt7.mongodb.net/newDB?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado");
  }catch(error){
    console.log(`Erro: ${error}`);
  }
})();

// definição do modelo
const studentSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

//definindo  ao modelo da coleção
mongoose.model('student', studentSchema, 'student');
const student = mongoose.model('student'); // define a coleção

//novo 
new student({
  name: 'Paulo Assis',
  subject: 'Matematica',
  type:'Trabalho Prático',
  value: 22,
})
  .save()
  .then(()=> console.log("Doc Inserido"))
  .catch((err) => console.log("Falha ao inserir"))