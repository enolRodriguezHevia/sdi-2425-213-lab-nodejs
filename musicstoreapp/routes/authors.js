module.exports = function (app) {
    app.get("/authors/add", function (req, res) {
        let roles = [
            { value: "cantante", label: "Cantante" },
            { value: "trompetista", label: "Trompetista" },
            { value: "violinista", label: "Violinista" },
            { value: "saxofonista", label: "Saxofonista" },
            { value: "pianista", label: "Pianista" }
        ];

        res.render("authors/add.twig", { roles: roles });
    });

    app.post("/authors/add", function (req, res) {
        let name = (req.body.name == null || req.body.name.trim().length === 0)
            ? "Nombre no enviado en la petición" : req.body.name;

        let group = (req.body.group == null || req.body.group.trim().length === 0)
            ? "Grupo no enviado en la petición" : req.body.group;

        let role = (req.body.role == null || req.body.role.trim().length === 0)
            ? "Rol no enviado en la petición" : req.body.role;

        let response = "Autor agregado: " + "<br>" + "Nombre: " + name + "<br>"
            + " Grupo: " + group + "<br>"
            + " Rol: " + role;

        res.send(response);
    });

    app.get('/authors/filter/:role', function(req, res) {
        let authors = [
            { name: "Michael Jackson", group: "Jackson 5", role: "Cantante" },
            { name: "Freddy Mercury", group: "Queen", role: "Cantante" },
            { name: "David Manuel Muñoz", group: "Estopa", role: "Cantante" }
        ];
        let response = {
            authors: authors.filter(author => author.role.trim().toLowerCase() ===
                req.params.role.trim().toLowerCase())
        };
        res.render("authors/authors.twig", response);
    });

    app.get("/authors", function (req, res) {
        let authors = [
            { name: "Michael Jackson", group: "Jackson 5", role: "Cantante" },
            { name: "Freddy Mercury", group: "Queen", role: "Cantante" },
            { name: "David Manuel Muñoz", group: "Estopa", role: "Cantante" }
        ];

        let response = {
            title: 'Lista de Autores',
            authors: authors
        };
        res.render("authors/authors.twig", response);
    });

    app.get("/authors/*", function (req, res) {
        res.redirect("/authors");
    });
}