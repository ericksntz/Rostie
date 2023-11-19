export function User(id, nome, email, senha, idPantry){
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.idPantry = idPantry;
}

export function Item(nome, qntd, categoria, vencimento, image){
    this.nome = nome;
    this.qntd = qntd;
    this.categoria = categoria;
    this.vencimento = vencimento;
    this.image = image;
}