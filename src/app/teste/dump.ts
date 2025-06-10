function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" placeholder="Valor mensal da conta de energia (R$)" {...register("Valor mensal da conta de energia (R$)", {required: true, max: 100000, min: 0, maxLength: 6})} />
      <input type="text" placeholder="Cidade" {...register("Cidade", {required: true, max: 30, min: 0})} />
      <select {...register("Estado", { required: true })}>
        <option value="AC">AC</option>
        <option value="AL">AL</option>
        <option value="AP">AP</option>
        <option value="AM">AM</option>
        <option value="BA">BA</option>
        <option value="CE">CE</option>
        <option value="DF">DF</option>
        <option value="ES">ES</option>
        <option value="GO">GO</option>
        <option value="MA">MA</option>
        <option value="MT">MT</option>
        <option value="MS">MS</option>
        <option value="MG">MG</option>
        <option value="PA">PA</option>
        <option value="PB">PB</option>
        <option value="PR">PR</option>
        <option value="PE">PE</option>
        <option value="PI">PI</option>
        <option value="RJ">RJ</option>
        <option value="RN">RN</option>
        <option value="RS">RS</option>
        <option value="RO">RO</option>
        <option value="RR">RR</option>
        <option value="SC">SC</option>
        <option value="SP">SP</option>
        <option value="SE">SE</option>
        <option value="TO">TO</option>
      </select>
      <select {...register("Tipo de fornecimento", { required: true })}>
        <option value="Monofásico">Monofásico</option>
        <option value="Bifásico">Bifásico</option>
        <option value="Trifásico">Trifásico</option>
      </select>
      <input type="text" placeholder="Nome" {...register("Nome", {required: true, max: 50, min: 0})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Telefone" {...register("Telefone", {required: true})} />
      <input type="text" placeholder="CPF" {...register("CPF", {required: true, min: 0, maxLength: 11, pattern: /^\d{11}$/i})} />

      <input type="submit" />
    </form>
  );
}