export const SET_USER = '[AUTH] SET';

export function setUser(options)
{
    return {
        type: SET_USER,
        options
    }
}
