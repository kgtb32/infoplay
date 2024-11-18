import { TestBed } from '@angular/core/testing';

import { AudioService } from './audio.service';
import { provideHttpClient } from '@angular/common/http';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(AudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should play audio", () => {
    const spy = spyOn(service, "playAudio")
    service.select()
    expect(spy).toHaveBeenCalledTimes(1)
    service.valid()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it("should play instance audio", () => {
    const instance = {
      play() {
        expect().nothing()
      },
    } as HTMLAudioElement
    service.playAudio(instance)
  })
});
