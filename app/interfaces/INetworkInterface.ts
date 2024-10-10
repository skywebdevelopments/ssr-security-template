export interface INetworkMetaDataInterface {
    network: Network
  }
  
  export interface Network {
    channel: Channel
    committers: Committer[]
    endorsers: Endorser[]
    mspids: string[]
  }
  
  export interface Channel {
    type: string
    name: string
    client: Client
    endorsers: Endorsers2
    committers: Committers2
    msps: Msps
  }
  
  export interface Client {
    type: string
    name: string
    mspid: any
    _tls_mutual: TlsMutual
    endorsers: Endorsers
    committers: Committers
    channels: Channels
    centralizedOptions: any
  }
  
  export interface TlsMutual {
    selfGenerated: boolean
    clientKey: string
    clientCert: string
    clientCertHash: ClientCertHash
  }
  
  export interface ClientCertHash {
    type: string
    data: number[]
  }
  
  export interface Endorsers {}
  
  export interface Committers {}
  
  export interface Channels {}
  
  export interface Endorsers2 {}
  
  export interface Committers2 {}
  
  export interface Msps {}
  
  export interface Committer {
    name: string
    client: Client2
    connected: boolean
    connectAttempted: boolean
    endpoint: Endpoint
    service: any
    type: string
    options: Options2
  }
  
  export interface Client2 {
    type: string
    name: string
    mspid: any
    _tls_mutual: TlsMutual2
    endorsers: Endorsers3
    committers: Committers3
    channels: Channels2
    centralizedOptions: any
  }
  
  export interface TlsMutual2 {
    selfGenerated: boolean
    clientKey: string
    clientCert: string
    clientCertHash: ClientCertHash2
  }
  
  export interface ClientCertHash2 {
    type: string
    data: number[]
  }
  
  export interface Endorsers3 {}
  
  export interface Committers3 {}
  
  export interface Channels2 {}
  
  export interface Endpoint {
    type: string
    options: Options
    url: string
    protocol: string
    creds: Creds
    addr: string
  }
  
  export interface Options {
    "grpc.max_receive_message_length": number
    "grpc.max_send_message_length": number
    "grpc.keepalive_time_ms": number
    "grpc.http2.min_time_between_pings_ms": number
    "grpc.keepalive_timeout_ms": number
    "grpc.http2.max_pings_without_data": number
    "grpc.keepalive_permit_without_calls": number
    "grpc-wait-for-ready-timeout": number
    "request-timeout": number
    clientCert: string
    clientKey: string
    url: string
    pem: string
    requestTimeout: number
  }
  
  export interface Creds {
    callCredentials: CallCredentials
    secureContext: SecureContext
    verifyOptions: VerifyOptions
    connectionOptions: ConnectionOptions
  }
  
  export interface CallCredentials {}
  
  export interface SecureContext {
    context: Context
  }
  
  export interface Context {}
  
  export interface VerifyOptions {}
  
  export interface ConnectionOptions {
    secureContext: SecureContext2
  }
  
  export interface SecureContext2 {
    context: Context2
  }
  
  export interface Context2 {}
  
  export interface Options2 {
    "grpc.max_receive_message_length": number
    "grpc.max_send_message_length": number
    "grpc.keepalive_time_ms": number
    "grpc.http2.min_time_between_pings_ms": number
    "grpc.keepalive_timeout_ms": number
    "grpc.http2.max_pings_without_data": number
    "grpc.keepalive_permit_without_calls": number
    "grpc-wait-for-ready-timeout": number
    "request-timeout": number
    clientCert: string
    clientKey: string
    url: string
    pem: string
    requestTimeout: number
  }
  
  export interface Endorser {
    name: string
    mspid: string
    client: Client3
    connected: boolean
    connectAttempted: boolean
    endpoint: Endpoint2
    service: any
    type: string
    options: Options4
    chaincodes: string[]
    discovered: boolean
  }
  
  export interface Client3 {
    type: string
    name: string
    mspid: any
    _tls_mutual: TlsMutual3
    endorsers: Endorsers4
    committers: Committers4
    channels: Channels3
    centralizedOptions: any
  }
  
  export interface TlsMutual3 {
    selfGenerated: boolean
    clientKey: string
    clientCert: string
    clientCertHash: ClientCertHash3
  }
  
  export interface ClientCertHash3 {
    type: string
    data: number[]
  }
  
  export interface Endorsers4 {}
  
  export interface Committers4 {}
  
  export interface Channels3 {}
  
  export interface Endpoint2 {
    type: string
    options: Options3
    url: string
    protocol: string
    creds: Creds2
    addr: string
  }
  
  export interface Options3 {
    "grpc.max_receive_message_length": number
    "grpc.max_send_message_length": number
    "grpc.keepalive_time_ms": number
    "grpc.http2.min_time_between_pings_ms": number
    "grpc.keepalive_timeout_ms": number
    "grpc.http2.max_pings_without_data": number
    "grpc.keepalive_permit_without_calls": number
    "grpc-wait-for-ready-timeout": number
    "request-timeout": number
    clientCert: string
    url: string
    pem: string
    requestTimeout: number
    clientKey?: string
    "ssl-target-name-override"?: string
    name?: string
    "grpc.ssl_target_name_override"?: string
    "grpc.default_authority"?: string
  }
  
  export interface Creds2 {
    callCredentials: CallCredentials2
    secureContext: SecureContext3
    verifyOptions: VerifyOptions2
    connectionOptions: ConnectionOptions2
  }
  
  export interface CallCredentials2 {}
  
  export interface SecureContext3 {
    context: Context3
  }
  
  export interface Context3 {}
  
  export interface VerifyOptions2 {}
  
  export interface ConnectionOptions2 {
    secureContext: SecureContext4
  }
  
  export interface SecureContext4 {
    context: Context4
  }
  
  export interface Context4 {}
  
  export interface Options4 {
    "grpc.max_receive_message_length": number
    "grpc.max_send_message_length": number
    "grpc.keepalive_time_ms": number
    "grpc.http2.min_time_between_pings_ms": number
    "grpc.keepalive_timeout_ms": number
    "grpc.http2.max_pings_without_data": number
    "grpc.keepalive_permit_without_calls": number
    "grpc-wait-for-ready-timeout": number
    "request-timeout": number
    clientCert: string
    clientKey: string
    url: string
    pem: string
    requestTimeout: number
    "ssl-target-name-override"?: string
    name?: string
    "grpc.ssl_target_name_override"?: string
    "grpc.default_authority"?: string
  }
  