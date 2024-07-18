export class ValidateTokenDto {

    private constructor(
        public use_code: string,

    ) { }

    static create(object: { [key: string]: any }): [string?, ValidateTokenDto?] {
        const {
            use_code,
        } = object;

        if (!use_code) return ["Missin uuid"];


        return [
            undefined,
            new ValidateTokenDto(
                use_code
            ),
        ];
    }
}