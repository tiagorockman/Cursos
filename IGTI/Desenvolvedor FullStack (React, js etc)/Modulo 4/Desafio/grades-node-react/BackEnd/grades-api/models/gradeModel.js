export default(mongoose) => {
const gradeSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  });
// sobrecreve o metodo toJSON para retornar o _id e no editar conseguir retornar corretamente
gradeSchema.method("toJSON", function(){
  const {_v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
});

  const gradeModel = mongoose.model("grades", gradeSchema);

return  gradeModel ;
};


