function converterTempo(segundos){
    if (segundos < 60) {
        return `${segundos}s`
    }
    
    const minutos = Math.floor(segundos / 60);
    const restSegundos = segundos % 60;
    if (minutos < 60){
        return `${minutos}m ${restSegundos}s`;
    }

    const horas = Math.floor(minutos / 60);
    const restMinutos = minutos % 60;
    return `${horas}h ${restMinutos}m ${restSegundos}s`;

    
}

describe('ex1TDD', () => {
    it("Deve retornar 30s quando receber 30", () => {
        const segundos = 30;
        const resultado = converterTempo(segundos);
        expect(resultado).toBe("30s");
    });
    it("Deve retornar '5m 50s' quando receber 350", () => {
        const segundos = 350
        const resultado = converterTempo(segundos);
        expect(resultado).toBe("5m 50s");
    });

    it("Deve retornar '1h 02m 05s' quando receber 3725", () => {
        const segundos = 3725;
        const resultado = converterTempo(segundos);
        expect(resultado).toBe("1h 2m 5s");
    });
});