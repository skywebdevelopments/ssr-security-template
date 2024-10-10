export interface IUserCAProfile {
    result: Result
    errors: any[]
    messages: any[]
    success: boolean
  }
  
  export interface Result {
    identities: Identity[]
    caname: string
  }
  
  export interface Identity {
    id: string
    type: string
    affiliation: string
    attrs: Attr[]
    max_enrollments: number
  }
  
  export interface Attr {
    name: string
    value: string
    ecert?: boolean
  }
  