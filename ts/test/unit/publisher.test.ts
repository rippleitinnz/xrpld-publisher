import { PublisherClient, fromDaysToExpiration } from '../../dist/npm/src'

describe('xrpld-publisher - PublisherClient', () => {
  const manifest =
    'JAAAAAFxIe101ANsZZGkvfnFTO+jm5lqXc5fhtEf2hh0SBzp1aHNwXMh7TN9+b62cZqTngaFYU5tbGpYHC8oYuI3G3vwj9OW2Z9gdkAnUjfY5zOEkhq31tU4338jcyUpVA5/VTsANFce7unDo+JeVoEhfuOb/Y8WA3Diu9XzuOD4U/ikfgf9SZOlOGcBcBJAw44PLjH+HUtEnwX45lIRmo0x5aINFMvZsBpE9QteSDBXKwYzLdnSW4e1bs21o+IILJIiIKU/+1Uxx0FRpQbMDA=='
  const pk = 'CC9E8B118E8E927DA82A66B9D931E1AB6309BA32F057F8B216600B347C552006'
  const vlPath = 'test/fixtures/vl.json'
  it('init vl', async () => {
    const client = new PublisherClient(undefined, vlPath)
    expect(client.vl.blob.sequence).toBe(2)
    expect(client.vl.blob.validators.length).toBe(1)
  })
  it('init new vl', async () => {
    const client = new PublisherClient(manifest)
    expect(client.vl.blob.sequence).toBe(1)
    expect(client.vl.blob.validators.length).toBe(0)
  })
  it('add validator', async () => {
    const client = new PublisherClient(undefined, vlPath)
    expect(client.vl.blob.sequence).toBe(2)
    const addManifest =
      'JAAAAAFxIe3kW20uKHcjYwGFkZ7+Ax8FIorTwvHqmY8kvePtYG4nSHMhAjIn+/pQWK/OU9ln8Rux6wnQGY1yMFeaGR5gEcFSGxa1dkYwRAIgSAGa6gWCa2C9XxIMSoAB1qCZjjJMXGpl5Tb+81U5RDwCIG3GQHXPUjFkTMwEcuM8G6dwcWzEfB1nYa5MqxFAhOXscBJApcamLcUBNxmABeKigy+ZYTYLqMKuGtV9HgjXKA5oI9CNH0xA6R52NchP3rZyXWOWS0tan25o0rwQBNIY78k6Cg=='
    client.addValidator(addManifest)
    expect(client.vl.blob.validators.length).toBe(2)
    expect(client.vl.blob.validators[1].pk).toBe(
      'EDE45B6D2E287723630185919EFE031F05228AD3C2F1EA998F24BDE3ED606E2748'
    )
    expect(client.vl.blob.validators[1].manifest).toBe(addManifest)
  })
  it('removel validator', async () => {
    const client = new PublisherClient(undefined, vlPath)
    expect(client.vl.blob.sequence).toBe(2)
    const removePk =
      'EDA164F4B36C2D730462D5F762BFA2808AA5092ABCECEBB27089525D1D054BE33B'
    client.removeValidator(removePk)
    expect(client.vl.blob.validators.length).toBe(0)
  })
  it('sign vl', async () => {
    const client = new PublisherClient(undefined, vlPath)
    expect(client.vl.blob.sequence).toBe(2)
    const addManifest =
      'JAAAAAFxIe3kW20uKHcjYwGFkZ7+Ax8FIorTwvHqmY8kvePtYG4nSHMhAjIn+/pQWK/OU9ln8Rux6wnQGY1yMFeaGR5gEcFSGxa1dkYwRAIgSAGa6gWCa2C9XxIMSoAB1qCZjjJMXGpl5Tb+81U5RDwCIG3GQHXPUjFkTMwEcuM8G6dwcWzEfB1nYa5MqxFAhOXscBJApcamLcUBNxmABeKigy+ZYTYLqMKuGtV9HgjXKA5oI9CNH0xA6R52NchP3rZyXWOWS0tan25o0rwQBNIY78k6Cg=='
    client.addValidator(addManifest)
    const expiration = fromDaysToExpiration(Date.now(), 30)
    client.signUnl(pk, undefined, expiration)
    expect(client.vl.blob.validators.length).toBe(2)
  })
})
