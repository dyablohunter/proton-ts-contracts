import { Name, Table, Singleton, U128, ExtendedSymbol, TableStore } from "..";
import { extendedSymbolToU128, U128ToExtSym } from "./allow.utils";

// scope: contract
@table("allowglobals", singleton)
export class AllowGlobals extends Table {
    constructor (
        public isPaused: boolean = false,
        public isActorStrict: boolean = false,
        public isTokenStrict: boolean = false,
    ) {
        super();
    }
}

// scope: contract
@table("allowedactor")
export class AllowedActor extends Table {
    constructor (
        public actor: Name = new Name(),
        public isAllowed: boolean = false,
        public isBlocked: boolean = false,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.actor.N;
    }
}

// scope: contract
@table("allowedtoken")
export class AllowedToken extends Table {
    constructor (
        public index: u64 = 0,
        public token: ExtendedSymbol = new ExtendedSymbol(),
        public isAllowed: boolean = false,
        public isBlocked: boolean = false,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.index;
    }

    @secondary
    get byToken(): U128 {
        return extendedSymbolToU128(this.token)
    }

    set byToken(value: U128) {
       this.token = U128ToExtSym(value)
    }
}